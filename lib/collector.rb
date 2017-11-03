require 'github'

class Collector
  def self.collect(number_of_tags)

    repos = Software.all

    repository_queries = repos.map do |repo|
      <<-GRAPHQL
        #{repo.name}: repository(owner:\"#{repo.owner}\", name:\"#{repo.name}\") {
          ...getTags
        }
      GRAPHQL
    end.join("\n")


    tags_query = Github::Client.parse(<<-GRAPHQL)
      query {
        #{repository_queries}
      }

      fragment getTags on Repository {
        tags: refs(refPrefix:\"refs/tags/\", first:#{number_of_tags}, direction: DESC) {
          edges {
            tag: node {
              name
              target {
                ... on Tag {
                  sha: oid
                  tagger {
                    name
                    email
                    date
                  }
                }
                ... on Commit {
                  sha: oid
                  committedDate
                }
              }
            }
          }
        }
      }
    GRAPHQL

    Github::Client.allow_dynamic_queries = true
    result = Github::Client.query(tags_query)

    data = result.original_hash["data"].deep_symbolize_keys

    data.each do |software, tags|
      begin
        values = tags[:tags][:edges].map do |tag|
          version      = tag[:tag][:name]

          if tag[:tag][:target][:__typename] == "Tag"
            tagged_at    = tag[:tag][:target][:tagger][:date]
            "((select id from softwares where name = '#{software}' limit 1), '#{version}', '#{tagged_at}')"
          elsif tag[:tag][:target][:__typename] == "Commit"
            tagged_at    = tag[:tag][:target][:committedDate]
            "((select id from softwares where name = '#{software}' limit 1), '#{version}', '#{tagged_at}')"
          end
        end.compact

        sql = <<-SQL
          insert into software_versions (software_id, "version", tagged_at) values #{values.join(?,)} on conflict do nothing;
        SQL

        ActiveRecord::Base.connection.execute(sql)

        puts "#{software} tags were inserted successfully"
      rescue StandardError => se
        require 'pry'; binding.pry;
        se.message
      end
    end
  end
end
