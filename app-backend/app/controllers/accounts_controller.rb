class AccountsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
        new_account = Account.new({
            account_id: params[:account_id],
            balance: params[:balance]
        })
        new_account.save

        render json: new_account
    end

    def show
        render json: Account.find_by_account_id(params[:id])
    end
end