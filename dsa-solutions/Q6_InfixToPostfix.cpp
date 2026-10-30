
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

char st[100];
int top = -1;

int precedence(char c) {
    if (c == '^') return 3;
    if (c == '*' || c == '/') return 2;
    if (c == '+' || c == '-') return 1;
    return 0;
}

int main() {
    string infix, postfix;

    cout << "Enter infix expression: ";
    cin >> infix;

    for (char c : infix) {
        if (isalnum(c))
            postfix += c;
        else if (c == '(')
            st[++top] = c;
        else if (c == ')') {
            while (top >= 0 && st[top] != '(')
                postfix += st[top--];
            if (top >= 0)
                top--;
        }
        else {
            while (top >= 0 && st[top] != '(' &&
                  (precedence(st[top]) > precedence(c) ||
                  (precedence(st[top]) == precedence(c) && c != '^')))
                postfix += st[top--];

            st[++top] = c;
        }
    }

    while (top >= 0)
        postfix += st[top--];

    cout << "Postfix expression: " << postfix;
    return 0;
}
