class Version < ActiveRecord::Base
  self.table_name = 'software_versions'

  belongs_to :software
end
