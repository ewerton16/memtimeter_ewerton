Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/ping', to: 'ping#show', format: :json, as: :ping

  resources :accounts, only: %i(create show)
  resources :transactions, only: %i(create index show)
end
