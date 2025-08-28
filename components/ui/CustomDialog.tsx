import { Dialog } from "@rneui/themed";
import React, { FC } from "react";
import { Text } from "react-native";

type Props = {
    onPressButton: () => void;
    dialogVisible: boolean;
    setDialogVisible: (visible: boolean) => void;
    buttonTitle?: string;
    dialogTitle?: string;
    dialogText1?: string;
    dialogText2?: string;
};

export const CoustomDialog: FC<Props> = (props) => {
    const {
        onPressButton, dialogVisible, setDialogVisible, buttonTitle, dialogTitle, dialogText1, dialogText2 } = props;

    return (
        <Dialog
            isVisible={dialogVisible}
            onBackdropPress={() => setDialogVisible(dialogVisible)}
        >
            <Dialog.Title title={dialogTitle} />
            <Text>{dialogText1}</Text>
            <Text>{dialogText2}</Text>
            <Dialog.Actions>
                <Dialog.Button
                    title={buttonTitle ? buttonTitle : "OK"}
                    onPress={onPressButton}
                />
            </Dialog.Actions>
        </Dialog>
    );
};
