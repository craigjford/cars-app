Rails.application.routes.draw do

    resources :repairs, only: [:create]
    resources :cars, only: [:create]
    resources :dealers, only: [:index, :show, :create, :destroy]
    # resources :users, only: [:show, :create]

    # this route is used to retrieve dealers with associated transactions to the logged in user  
    get "/mycars", to: "cars#myindex"
    get "/mydealers", to: "dealers#myindex"

    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"

  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
