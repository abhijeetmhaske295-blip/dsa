#include <iostream>
#include <string>
using namespace std;

struct Student {
    int id;
    string name;
    float cgpa;
};

int main() {
    int n;
    Student s[100];
    cout << "Number of students: ";
    cin >> n;
    for (int i = 0; i < n; i++) {
        cout << "Enter ID, name and CGPA: ";
        cin >> s[i].id >> s[i].name >> s[i].cgpa;
    }
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (s[j].cgpa > s[j + 1].cgpa) {
                Student temp = s[j];
                s[j] = s[j + 1];
                s[j + 1] = temp;
            }
        }
    }
    cout << "Records by CGPA (ascending):\n";
    for (int i = 0; i < n; i++)
        cout << s[i].id << " " << s[i].name << " " << s[i].cgpa << "\n";
    return 0;
}
