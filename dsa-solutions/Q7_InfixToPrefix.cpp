#include <iostream>
#include <string>
#include <cctype>
using namespace std;

char stackArray[100];
int top = -1;

void push(char ch) {
    stackArray[++top] = ch;
}

char pop() {
    return stackArray[top--];
}

int precedence(char op) {
    if (op == '^') return 3;
    if (op == '*' || op == '/') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}

int main() {
    string infix, reversed, postfix, prefix;

    cout << "Enter infix expression: ";
    cin >> infix;

    for (int i = (int)infix.length() - 1; i >= 0; i--)
        reversed += infix[i];

    for (int i = 0; i < (int)reversed.length(); i++) {
        if (reversed[i] == '(')
            reversed[i] = ')';
        else if (reversed[i] == ')')
            reversed[i] = '(';
    }

    for (char ch : reversed) {
        if (isalnum((unsigned char)ch))
            postfix += ch;
        else if (ch == '(')
            push(ch);

        else if (ch == ')') {
            while (top != -1 && stackArray[top] != '(')
                postfix += pop();

            if (top != -1)
                pop();
        }
        else {
            while (top != -1 && stackArray[top] != '(' &&
                  (precedence(stackArray[top]) > precedence(ch) ||
                  (precedence(stackArray[top]) == precedence(ch) && ch == '^')))
                postfix += pop();

            push(ch);
        }
    }

    while (top != -1)
        postfix += pop();

    for (int i = (int)postfix.length() - 1; i >= 0; i--)
        prefix += postfix[i];

    cout << "Prefix expression: " << prefix;
    return 0;
}
