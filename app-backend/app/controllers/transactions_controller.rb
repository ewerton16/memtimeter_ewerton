class TransactionsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
        new_transaction = Transaction.new({
            transaction_id: params[:transaction_id],
            account_id: params[:account_id],
            amount: params[:amount],
            created_at: params[:created_at]
        })
        new_transaction.save

        render json: new_transaction
    end
    
    def index
        render json: Transaction.all.map{|i| i.as_json}   
    end

    def show
        render json: Transaction.find_by_transaction_id(params[:id])
    end
end