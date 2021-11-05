class CreateTableTransactions < ActiveRecord::Migration[6.1]
  def up
    unless (table_exists? :transactions)
      create_table :transactions, id: false do |t|
        t.string :transaction_id, null: false, primary_key: true
        t.string :account_id, references: :accounts
        t.integer :amount, null: false
        t.datetime :created_at, null: false #I didn't use t.timestamps because it creates updated_at too.
      end
    end
  end

  def down
    drop_table :transactions if (table_exists? :transactions)
  end
end
