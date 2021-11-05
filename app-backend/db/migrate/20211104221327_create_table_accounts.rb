class CreateTableAccounts < ActiveRecord::Migration[6.1]
  def up
    unless (table_exists? :accounts)
      create_table :accounts, id: false do |t|
        t.string :account_id, null: false, primary_key: true
        t.integer :balance, null: false
      end
    end
  end

  def down
    drop_table :accounts if (table_exists? :accounts)
  end
end
