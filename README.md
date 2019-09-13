# NJSV2

If there is a scale error that is related to nerwork failures or the scale's do not seem to be working. You need to make sure that pm2 is running and the scale process is running on the app.trollandtoad.local server. You can check this by running pm2 show and looking for the line related to the scale process. (9/13/19) update, The pm2 process is set to autostart if the server gets rebooted and it is supposed to restart if it dies now, so you should not have to manually run the command. 
