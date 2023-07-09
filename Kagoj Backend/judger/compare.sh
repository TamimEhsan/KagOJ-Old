diff -w $1 $2 >/dev/null;REPLY=$?
if [ ${REPLY} -eq 0 ]
then
         echo "1"
else
         echo "0"
fi