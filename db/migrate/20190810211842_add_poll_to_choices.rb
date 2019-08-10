class AddPollToChoices < ActiveRecord::Migration[5.2]
  def change
    add_reference :choices, :poll, foreign_key: true
  end
end
