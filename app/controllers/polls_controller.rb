class PollsController < ApplicationController
  before_action :authorize_request, except: :create

  def index
    @polls = Poll.where(user_id: @current_user.id)
    render json: @polls, include: {choices: {include: :users}}, status: :ok
  end
  
  def show
    @poll = Poll.find(params[:id])
    render json: @poll, include: {choices: {include: :users}}, status: :ok
  end
  
  def create
    @poll = Poll.new(poll_params)
    if @poll.save
      render json: @poll, include: {choices: {include: :users}}, status: :created
    else
      render json: { errors: @poll.errors }, status: :unprocessable_entity
     end
  end
  
  def update
    @poll = Poll.find(params[:id])
    if @poll.update(poll_params)
      render json: @poll, include: {choices: {include: :users}}, status: :ok
    else
      render json: { errors: @poll.errors }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @poll = Poll.find(params[:id])
    @poll.destroy
    render json: @poll, status: :ok
  end
  
  private

  def poll_params
    params.require(:poll).permit(:title, :open, :user_id)
  end
end