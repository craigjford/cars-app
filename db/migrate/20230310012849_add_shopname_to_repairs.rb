class AddShopnameToRepairs < ActiveRecord::Migration[7.0]
  def change
    add_column :repairs, :shop_name, :string
  end
end
