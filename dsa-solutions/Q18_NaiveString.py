text = input("Enter text: ")
pattern = input("Enter pattern: ")
n, m = len(text), len(pattern)
matches = []

for i in range(n - m + 1):
    if text[i:i + m] == pattern:
        matches.append(i)

print("Starting indices:", matches)
