class SessionsController < ApplicationController

  # POST '/login'
  def create
    user = User.find_by_username(params[:username])
    if user && user.authenticate(params[:password])  
      session[:user_id] = user.id
      current_user = user
      render json: user, status: :ok
    else  
      if params[:username].length > 0 && params[:password].length > 0
          render json: { error: "Username/password does not exist - Have you Signed up?" }, status: :unauthorized
      else
          render json: { error: "Username and password are both required"}, status: :unauthorized
      end  
    end
  end

  # DELETE '/logout'
    def destroy
        if session[:user_id] == nil
            render json: { error: "User is not logged in" }, status: :unauthoried
        else
            session.delete :user_id
            head :no_content
        end
    end

end
