class UsersController < ApplicationController

  # GET /users
  # DON'T NEED
  def index
    @users = User.all
    render json: @users, status: :ok
  end

  # GET /users/:id
  def show
    @user = User.find(params[:id])
    # render json: @user, include: [{polls: {include: :choices}}, {choices: {include: :poll}}], status: :ok
    render json: @user, include: [{polls: {include: {choices: {include: :users}}}}, {choices: {include: :poll}}], status: :ok
  end

  # POST /users
  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PUT /users/:id
  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render json: @user, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/:id
  def destroy
    @user = User.find(params[:id])
    @user.destroy
    render json: @dojo, status: :ok
  end

  # def verify
  #   @user = {
  #     id: @current_user[:id],
  #     username: @current_user[:username],
  #     email: @current_user[:email]
  #   }

  #   render json: @user
  # end

  private

  # def set_user
  #   @user = User.find(params[:id])
  # end

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end