def stringToList(string: str):
    # Returns text metadata retrieved from database as a list
    # Format of text metadata is [[kanji: str, furigana: str, hiragana : str, grammar : Bool]]
    list = []
    i = 1
    start_of_quote = False
    word = ''
    while i < len(string)-1:

        char = string[i] 
        
        if char == '[':
            sub_list = []
        elif char == ']':
            list.append(sub_list)
        elif char == ',' and not start_of_quote:
            pass
        elif char == " " and not start_of_quote:
            pass
        elif char == " " and start_of_quote:
            word += char
        else:
            if not start_of_quote:
                if char == "N": # Always equals None
                    sub_list.append(None)
                    i += 3
                elif char == "T":
                    sub_list.append(True)
                    i += 3
                elif char == "F":
                    sub_list.append(False)
                    i += 4
            if char == "'":
                if not start_of_quote: # If char is the opening quotation mark
                    word = '' 
                else:
                    sub_list.append(word)
                start_of_quote = not start_of_quote
            else: # Any letters in a quote
                word += char

        i += 1

    return list

def cleanStrings(arr: list):
    for i in arr:
        if i[2] is not None:
            # print(i[2])
            i[2] = i[2].replace("@@", "'")
    return arr

def formatStringsHtml(arr: list):
    string = ''
    for i in arr:
        if i[0] is not None:
            string += f'<ruby>{i[0]}<rp>(</rp><rt>{i[1]}</rt><rp>)</rp></ruby>'
        else:
            string += f'{i[2]}'
    
    return string