Rails.application.routes.draw do

    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"

    get "/mycars", to: "cars#myindex"
    get "/mydealers", to: "dealers#myindex"

    resources :repairs, only: [:index, :show, :create, :destroy, :update]
    resources :cars, only: [:index, :show, :create, :destroy, :update]
    resources :dealers, only: [:index, :create, :destroy]

    # this route is used to retrieve dealers with associated transactions to the logged in user  

  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
