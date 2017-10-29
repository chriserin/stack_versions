Rails.application.routes.draw do
  scope '/api' do
    get :versions, to: 'versions#index'
  end
end
