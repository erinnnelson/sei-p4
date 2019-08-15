class ChoicesController < ApplicationController
  before_action :authorize_request
  
  def index
    @poll = Poll.find(params[:poll_id])
    @choices = Choice.where(poll_id: @poll.id)
    render json: @choices, include: [:users, :poll], status: :ok
  end

  def show
    @choice = Choice.find(params[:id])
    render json: @choice, include: :users, status: :ok
  end

  def create
    @choice = Choice.new(choice_params)
    if @choice.save
      render json: @choice
    else
      render json: { errors: @choice.errors }, status: :unprocessable_entity
    end
  end

  def update
    @choice = Choice.find(params[:id])
    if @choice.update(choice_params)
      render json: @choice
    else
      render json: { errors: @choice.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @choice = Choice.find(params[:id])
    @choice.destroy
    render json: @choice, include: :users, status: :ok
  end

  def vote
    @choice = Choice.find(params[:id])
    @poll = Poll.find(params[:poll_id])
    @poll.choices.each do |choice|
    if 
      choice.users.include? @current_user
        render json: false
        return
      end
    end
    @choice.users.push(@current_user)
    render json: @poll, include: {choices: {include: :users}}, status: :ok
  end

  private

  def choice_params
    params.require(:choice).permit(:name, :poll_id)
  end
end