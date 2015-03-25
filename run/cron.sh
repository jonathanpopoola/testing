#SCRIPT_PATH=$(dirname $(readlink -n $0))
SCRIPT_PATH=$(dirname $0)
#echo $SCRIPT_PATH

cd $SCRIPT_PATH
cd ../
echo "Running cron job: $(date)" >> run/cron.log
git pull origin >> run/cron.log
echo "" >> run/cron.log
