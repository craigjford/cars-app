class DealersController < ApplicationController

    before_action :authorize

    # def myindex
        # current_user = User.find(1)
        # user = current_user      
        # dealers = current_user.dealers.distinct.order(:name)
        # dealers = Dealer.find_by_sql(["Select * from dealer inner join cars on dealer.id = cars.dealer_id where user_id = ?", user.id])
        # render json: dealers, each_serializer: DealerAllSerializer, status: :ok
    #     render json: dealers, status: :ok
    # end

    # def myindex
    #     current_user = User.find(1)
    #     byebug
    #     # dealers = Dealer.joins("INNER JOIN cars ON cars.dealer_id = dealers.id AND books.user_id = current_user.id")
    #     dealers = Dealer.joins("INNER JOIN cars ON cars.dealer_id = dealers.id AND cars.user_id = 1"), include: :cars
    #     render json: dealers, status: :ok
    # end

    def myindex
        # current_user = User.find(1)
        dealers = current_user.dealers.order(:name)
        render json: dealers, each_serializer: DealerCarSerializer,status: :ok
    end
    
    def index
        dealers = Dealer.all.order(:name)  
        render json: dealers, status: :ok
    end

    def create
        dealer = Dealer.create!(dealer_params)
        render json: dealer, status: :created
    end

    private

    def dealer_params 
        params.permit(:name, :contact, :phone, :email)
    end

    def authorize   
        return render json: { error: "User not authorized" }, status: :unauthorized unless session.include?(:user_id)
    end

end
