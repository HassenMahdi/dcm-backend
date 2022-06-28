docker login datacapture.azurecr.io --username datacapture --password =ZVmGGgbBGItTbE6PXdhsCr=Mj8pDTeY
docker build -t datacapturefront --build-arg ENV=tst .
docker tag datacapturefront datacapture.azurecr.io/datacapturefront:tst
docker push datacapture.azurecr.io/datacapturefront:tst
