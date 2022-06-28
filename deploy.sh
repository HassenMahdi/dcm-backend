docker login datacapture.azurecr.io --username datacapture --password =ZVmGGgbBGItTbE6PXdhsCr=Mj8pDTeY
docker build -t datacapturefront --build-arg ENV=production .
docker tag datacapturefront datacapture.azurecr.io/datacapturefront
docker push  datacapture.azurecr.io/datacapturefront 
