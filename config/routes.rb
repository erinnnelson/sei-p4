Rails.application.routes.draw do
  resources :users do
    resources :polls do
      resources :choices
    end
  end
end
