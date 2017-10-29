# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171028205705) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "software_versions", id: :serial, force: :cascade do |t|
    t.text "version", null: false
    t.integer "software_id"
    t.datetime "tagged_at", null: false
    t.datetime "created_at", default: -> { "now()" }, null: false
    t.datetime "updated_at", default: -> { "now()" }, null: false
    t.index ["version", "software_id"], name: "software_versions_unique_idx", unique: true
  end

  create_table "softwares", id: :serial, force: :cascade do |t|
    t.text "name", null: false
    t.text "owner", null: false
    t.datetime "created_at", default: -> { "now()" }, null: false
    t.datetime "updated_at", default: -> { "now()" }, null: false
  end

  add_foreign_key "software_versions", "softwares", name: "software_versions_software_id_fkey"
end
