namespace :versions do
  task :collect_recent => :environment do
    require 'collector'
    Collector.collect(5)
  end

  task :collect_history => :environment do
    require 'collector'
    Collector.collect(100)
  end

  task :insert_softwares => :environment do
    softwares_attributes = [
      %w[rails rails],
      %w[nodejs node],
      %w[yarnpkg yarn],
      %w[facebook react],
      %w[elixir-lang elixir],
      %w[phoenixframework phoenix],
      %w[ruby ruby],
      %w[keathley wallaby],
      %w[reactjs redux],
    ].map do |(owner, name)|
      {
        owner: owner,
        name: name
      }
    end

    Software.create(softwares_attributes)
  end
end
