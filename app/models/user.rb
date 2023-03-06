class User < ApplicationRecord
    has_secure_password
    has_many :cars
    has_many :dealers, through: :cars
    # has_many :repairs, through: :cars    
    validates :username, :password, :first_name, :last_name, presence: true
    validates :username, uniqueness: true
end
