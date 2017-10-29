require 'graphql/client'
require 'graphql/client/http'


class Github
  ADDR = GraphQL::Client::HTTP.new("https://api.github.com/graphql") do
    def headers(context)
      {
        "Authorization" => "Bearer #{File.read('/home/chris/graphql.token').strip}"
      }
    end
  end

  Schema = GraphQL::Client.load_schema(ADDR)
  Client = GraphQL::Client.new(
    schema: Schema,
    execute: ADDR
  )
end
