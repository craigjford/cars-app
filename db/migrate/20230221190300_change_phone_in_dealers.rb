class ChangePhoneInDealers < ActiveRecord::Migration[7.0]
  def change
    change_column :dealers, :phone, :string
  end
end
