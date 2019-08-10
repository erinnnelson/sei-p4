class CreateJoinTableUsersChoices < ActiveRecord::Migration[5.2]
  def change
    create_join_table :users, :choices do |t|
      # t.index [:user_id, :choice_id]
      # t.index [:choice_id, :user_id]
    end
  end
end
