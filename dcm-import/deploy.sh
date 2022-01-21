docker login datacapture.azurecr.io --username datacapture --password =ZVmGGgbBGItTbE6PXdhsCr=Mj8pDTeY
docker build -t dcm-import .
docker tag dcm-import datacapture.azurecr.io/dcm-import
docker push  datacapture.azurecr.io/dcm-import
