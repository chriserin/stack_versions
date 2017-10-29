class VersionsController < ApplicationController
  def index
    render(
      status: 200,
      json: Version.joins(:software).select('*').order(tagged_at: :desc)
    )
  end
end
