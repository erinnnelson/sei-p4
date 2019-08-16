class AddOptionPositionToChoice < ActiveRecord::Migration[5.2]
  def change
    add_column :choices, :option_position, :integer
  end
end
