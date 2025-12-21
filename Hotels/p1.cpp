#include<stdio.h>
int main(){
    int  ARR[100];
    int i,n,pos,val;
    printf("Enter number of terms : ");
    scanf("%d",&n);
    printf("Enter %d numbers in ARRAY :\n",n);
    for(i=0;i<n;i++){
        scanf("%d",&ARR[i]);
    }
    printf("Enter the Postion where you want to insert number : ");
    scanf("%d",&pos);
    printf("Enter the value to insert : ");
    scanf("%d",&val);

    for(i=n-1;i>=pos-1;i--){
        ARR[i+1]=ARR[i];
    }
    ARR[pos-1]=val;
    n++;
    printf("ARRAY After Insert New Element :\n");
    for(i=0;i<n;i++){
        printf("%d ",ARR[i]);
    }
}