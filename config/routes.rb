Rails.application.routes.draw do
  post '/vote', to: 'choices#vote'
  post '/auth/login', to: 'authentication#login'
  get '/users/verify', to: 'users#verify'
  get '/user', to: 'users#user'

  resources :users
  resources :polls do
    resources :choices
  end
end
