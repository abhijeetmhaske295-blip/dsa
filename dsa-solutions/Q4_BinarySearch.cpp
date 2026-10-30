#include <iostream>
using namespace std;

int main() {
    int n, searchID, temp;
    int ids[50];

    cout << "Enter number of student IDs: ";
    cin >> n;

    cout << "Enter student IDs: ";
    for (int i = 0; i < n; i++)
        cin >> ids[i];

    for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            if (ids[i] > ids[j]) {
                temp = ids[i];
                ids[i] = ids[j];
                ids[j] = temp;
            }
        }
    }

    cout << "Sorted IDs: ";
    for (int i = 0; i < n; i++)
        cout << ids[i] << " ";

    cout << "\nEnter ID to search: ";
    cin >> searchID;

    int low = 0, high = n - 1;

    while (low <= high) {
        int mid = (low + high) / 2;

        if (ids[mid] == searchID) {
            cout << "ID found at index " << mid;
            return 0;
        }
        else if (searchID < ids[mid])
            high = mid - 1;
        else
            low = mid + 1;
    }

    cout << "ID not found";
    return 0;
}
