class AddTableStackVersions < ActiveRecord::Migration[5.0]
  def up
    execute <<-SQL
      create table softwares (
        id serial primary key,
        name text not null,
        owner text not null,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      );

      create table software_versions (
        id serial primary key,
        "version" text not null,
        software_id integer references softwares(id),
        tagged_at timestamptz not null,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      );

      create unique index software_versions_unique_idx on software_versions using btree ("version", software_id);
    SQL
  end

  def down
    execute <<-SQL
      drop index software_versions_unique_idx;
      drop table software_versions;
      drop table softwares;
    SQL
  end
end
