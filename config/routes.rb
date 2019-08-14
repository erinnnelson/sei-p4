Rails.application.routes.draw do
  post '/auth/login', to: 'authentication#login'
  get '/users/verify', to: 'users#verify'
  get '/user', to: 'users#user'
  get '/polls/:poll_id/vote/:id', to: 'choices#vote'

  resources :users
  resources :polls do
    resources :choices
  end
end
