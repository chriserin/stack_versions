require 'graphql/client'
require 'graphql/client/http'


class Github
  ADDR = GraphQL::Client::HTTP.new("https://api.github.com/graphql") do
    def headers(context)
      {
        "Authorization" => "Bearer #{ENV.fetch("GITHUB_TOKEN")}"
      }
    end
  end

  Schema = GraphQL::Client.load_schema(ADDR)
  Client = GraphQL::Client.new(
    schema: Schema,
    execute: ADDR
  )
end
