class DealersController < ApplicationController

    def index
        dealers = Dealer.all
        render json: dealers, status: :ok
    end

    def show 
        dealer = Dealers.find(params[:id])
        render json: dealer
    rescue ActiveRecord::RecordNotFound
        render json: "Dealer not found", status: :not_found
    end

end
