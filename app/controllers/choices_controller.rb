class ChoicesController < ApplicationController
  def index
    @poll = Poll.find(params[:poll_id])
    @choices = Choice.where(choice_id: @choice.id)
    render json: @choices, include: :users, status: :ok
  end

  def show
    @choice = Choice.find(params[:id])
    render json: @choice, include: :users, status: :ok
  end

  def create
    @user = User.find(params[:user_id])
    @choice = Choice.new(choice_params)
    if @choice.save
      @user.choices.push(@choice)
      render json: @choice, include: :users, status: :created
    else
      render json: { errors: @choice.errors }, status: :unprocessable_entity
    end
  end

  def update
    @choice = Choice.find(params[:id])
    if @choice.update(choice_params)
      render json: @choice, include: :users, status: :ok
    else
      render json: { errors: @choice.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @choice = Choice.find(params[:id])
    @choice.destroy
    render json: @choice, include: :users, status: :ok
  end

  private

  def choice_params
    params.require(:Choice).permit(:name, :name, :poll_id)
  end
end