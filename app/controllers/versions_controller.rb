class VersionsController < ApplicationController
  def index
    render(
      status: 200,
      json: Version.all
    )
  end
end
