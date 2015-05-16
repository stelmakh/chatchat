get '/' do
  Message.all().to_json
end

post '/' do
  request.body.rewind
  data = JSON.parse request.body.read

  if message = Message.create(text: data['text'])
    message.to_json
  else
    [500, 'Error']
  end
end

put '/:id' do
  message = Message.find(params[:id])

  request.body.rewind
  data = JSON.parse request.body.read

  if message.update_attribute(:text, data['text'])
    message.to_json
  else
    [500, 'Error']
  end

end
