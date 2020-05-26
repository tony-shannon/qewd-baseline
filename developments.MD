now moving to set up a development branch after tidying up branches on my fork of qwd baseline

TShannon  26th May 2020

Checked set up & branch on DO machine
NB note that as recent dev done on rasp Pi that some of the setup scripts have been copied across... start, start_p, stop etc and dont work on regular linux VMs without modification
So remember to clear those and run the install script if needs be


26th May pm
Session Data storage
added Session functionality inc storing of data with session value and getting it back
see www/qewd-ws-demo  qewd-apps/qewd-ws-demo/qewd-session-t2


remember that we set single value with 
session.data.$('sessionStarWarsHero').value = "R2D2";  
and get that data with
session.data.$('sessionStarWarsHero').value 

but we set object to session data with
session.data.$('sessionStarWarsWarrior').setDocument(data2session);  
and get with
session.data.$('sessionStarWarsWarrior').getDocument()