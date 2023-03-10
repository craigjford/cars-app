Rails.application.routes.draw do

    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"

    get "/mycars", to: "cars#myindex"
    get "/mydealers", to: "dealers#myindex"

    resources :repairs, only: [:index, :create, :destroy, :update]
    resources :cars, only: [:create]
    resources :dealers, only: [:index, :show, :create, :destroy]

    # this route is used to retrieve dealers with associated transactions to the logged in user  

  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
