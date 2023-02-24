Rails.application.routes.draw do
  # namespace :api do
    # resources :repairs
    # resources :cars
    resources :dealers, only: [:index, :show, :create]
    resources :users, only: [:show, :create]

    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
  # end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
