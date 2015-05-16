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

delete '/:id' do
  message = Message.find(params[:id])

  if message.destroy
    message.to_json
  else
    [500, 'Error']
  end
end
