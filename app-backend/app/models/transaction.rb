class Transaction < ActiveRecord::Base
    
    belongs_to :account

    before_create :generate_transaction_id
    after_save :update_account_balance

    validates :transaction_id, :account_id, :amount, :presence => true

    def generate_transaction_id
        self.transaction_id ||= SecureRandom.uuid
    end

    def update_account_balance
        sum_amount = Transaction.where(account_id: self.account_id).sum(:amount)
        account.update_columns(balance: sum_amount)
    end
end