require 'sinatra'
require 'active_record'


ActiveRecord::Base.establish_connection(
  :adapter => 'sqlite3',
  :database =>  'chat.sqlite3.db'
)


get '/' do
  'Heeeey yooooo'
end
