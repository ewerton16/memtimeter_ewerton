class Account < ActiveRecord::Base
    validates :account_id, :balance, :presence => true
    
    before_create :fill_account_balance

    def fill_account_balance
        self.account_id ||= SecureRandom.uuid
        self.balance ||= 0
    end
end